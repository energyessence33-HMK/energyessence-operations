import { View, Text, TouchableOpacity, ScrollView, FlatList } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import { MaterialIcons } from "@expo/vector-icons";
import { CommunityService } from "@/lib/services/community-service";
import { useEffect, useState } from "react";

interface CommunityPost {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  title: string;
  content: string;
  category: "success_story" | "question" | "tip" | "achievement";
  tags: string[];
  likes: number;
  comments: number;
  createdAt: string;
  updatedAt: string;
}

export default function CommunityScreen() {
  const colors = useColors();
  const [selectedCategory, setSelectedCategory] = useState<CommunityPost["category"] | "all">("all");
  const [posts, setPosts] = useState<CommunityPost[]>([]);

  useEffect(() => {
    loadPosts();
  }, [selectedCategory]);

  const loadPosts = async () => {
    const allPosts = await CommunityService.getPosts(
      selectedCategory === "all" ? undefined : (selectedCategory as any)
    );
    setPosts(allPosts);
  };

  const categories: { id: CommunityPost["category"] | "all"; label: string; icon: string }[] = [
    { id: "all", label: "All", icon: "dashboard" },
    { id: "success_story", label: "Success Stories", icon: "trending-up" },
    { id: "question", label: "Questions", icon: "help" },
    { id: "tip", label: "Tips", icon: "lightbulb" },
    { id: "achievement", label: "Achievements", icon: "star" },
  ];

  return (
    <ScreenContainer className="bg-background">
      <View className="flex-1">
        {/* Header */}
        <View className="px-6 py-6 border-b" style={{ borderColor: colors.border }}>
          <Text
            className="text-3xl font-bold mb-2"
            style={{ color: colors.foreground }}
          >
            Community
          </Text>
          <Text
            className="text-sm"
            style={{ color: colors.muted }}
          >
            Share wins, learn from others, celebrate together
          </Text>
        </View>

        {/* Category Filter */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="px-6 py-4"
          contentContainerStyle={{ gap: 8 }}
        >
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat.id}
              onPress={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full flex-row items-center gap-2 ${
                selectedCategory === cat.id ? "bg-primary" : "bg-surface"
              }`}
            >
              <MaterialIcons
                name={cat.icon as any}
                size={16}
                color={selectedCategory === cat.id ? "white" : colors.foreground}
              />
              <Text
                className="text-sm font-semibold"
                style={{
                  color: selectedCategory === cat.id ? "white" : colors.foreground,
                }}
              >
                {cat.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Posts List */}
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 24, gap: 16 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              className="p-4 rounded-xl border"
              style={{
                backgroundColor: colors.surface,
                borderColor: colors.border,
              }}
            >
              {/* Post Header */}
              <View className="flex-row items-start justify-between mb-3">
                <View className="flex-1">
                  <View className="flex-row items-center gap-2 mb-2">
                    <View
                      className="w-8 h-8 rounded-full items-center justify-center"
                      style={{ backgroundColor: colors.primary }}
                    >
                      <Text className="text-white font-bold text-xs">
                        {item.userName.charAt(0).toUpperCase()}
                      </Text>
                    </View>
                    <View>
                      <Text
                        className="font-semibold text-sm"
                        style={{ color: colors.foreground }}
                      >
                        {item.userName}
                      </Text>
                      <Text
                        className="text-xs"
                        style={{ color: colors.muted }}
                      >
                        {new Date(item.createdAt).toLocaleDateString()}
                      </Text>
                    </View>
                  </View>
                </View>
                <View
                  className="px-2 py-1 rounded-full"
                  style={{ backgroundColor: colors.primary + "33" }}
                >
                  <Text
                    className="text-xs font-semibold"
                    style={{ color: colors.primary }}
                  >
                    {item.category.replace("_", " ").toUpperCase()}
                  </Text>
                </View>
              </View>

              {/* Post Content */}
              <Text
                className="font-bold text-base mb-2"
                style={{ color: colors.foreground }}
              >
                {item.title}
              </Text>
              <Text
                className="text-sm mb-4 leading-relaxed"
                style={{ color: colors.muted }}
              >
                {item.content.substring(0, 150)}...
              </Text>

              {/* Tags */}
              {item.tags.length > 0 && (
                <View className="flex-row flex-wrap gap-2 mb-4">
                  {item.tags.map((tag, idx) => (
                    <View
                      key={idx}
                      className="px-3 py-1 rounded-full"
                      style={{ backgroundColor: colors.primary + "20" }}
                    >
                      <Text
                        className="text-xs"
                        style={{ color: colors.primary }}
                      >
                        #{tag}
                      </Text>
                    </View>
                  ))}
                </View>
              )}

              {/* Engagement */}
              <View className="flex-row gap-6 pt-3 border-t" style={{ borderColor: colors.border }}>
                <View className="flex-row items-center gap-2">
                  <MaterialIcons name="favorite" size={16} color={colors.primary} />
                  <Text
                    className="text-xs font-semibold"
                    style={{ color: colors.foreground }}
                  >
                    {item.likes}
                  </Text>
                </View>
                <View className="flex-row items-center gap-2">
                  <MaterialIcons name="comment" size={16} color={colors.primary} />
                  <Text
                    className="text-xs font-semibold"
                    style={{ color: colors.foreground }}
                  >
                    {item.comments}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <View className="items-center justify-center py-12">
              <MaterialIcons name="forum" size={48} color={colors.muted} />
              <Text
                className="text-base font-semibold mt-4"
                style={{ color: colors.foreground }}
              >
                No posts yet
              </Text>
              <Text
                className="text-sm text-center mt-2"
                style={{ color: colors.muted }}
              >
                Be the first to share your story!
              </Text>
            </View>
          }
        />
      </View>

      {/* New Post Button */}
      <TouchableOpacity
        className="absolute bottom-8 right-6 w-16 h-16 rounded-full items-center justify-center"
        style={{ backgroundColor: colors.primary }}
      >
        <MaterialIcons name="add" size={32} color="white" />
      </TouchableOpacity>
    </ScreenContainer>
  );
}
