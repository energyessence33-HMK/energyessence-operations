import { ScrollView, Text, View, TouchableOpacity } from "react-native";
import { useState } from "react";

import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";

interface Course {
  id: string;
  title: string;
  description: string;
  modules: number;
  progress: number;
  icon: string;
}

interface Resource {
  id: string;
  title: string;
  type: string;
  icon: string;
}

export default function LearnGrowScreen() {
  const colors = useColors();
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);

  const courses: Course[] = [
    {
      id: "1",
      title: "Spiritual Identity Mastery",
      description: "Find your essence in Christ consciousness",
      modules: 5,
      progress: 60,
      icon: "✨",
    },
    {
      id: "2",
      title: "Elite Brand Building",
      description: "Professional branding framework",
      modules: 8,
      progress: 25,
      icon: "👑",
    },
    {
      id: "3",
      title: "Customer Psychology",
      description: "Master emotional connection and conversions",
      modules: 6,
      progress: 0,
      icon: "🧠",
    },
    {
      id: "4",
      title: "Video Creation Mastery",
      description: "Professional 1-min & 3-min videos",
      modules: 7,
      progress: 40,
      icon: "🎬",
    },
    {
      id: "5",
      title: "How to Get Paid 2 Exist",
      description: "Monetization and passive income",
      modules: 9,
      progress: 15,
      icon: "💰",
    },
  ];

  const resources: Resource[] = [
    { id: "1", title: "Brand Strategy Template", type: "PDF", icon: "📄" },
    { id: "2", title: "Copywriting Swipe File", type: "PDF", icon: "📄" },
    { id: "3", title: "Psychology Principles", type: "Video", icon: "🎥" },
    { id: "4", title: "Sales Funnel Guide", type: "Guide", icon: "📖" },
    { id: "5", title: "Pricing Strategy", type: "Worksheet", icon: "📊" },
    { id: "6", title: "Case Studies", type: "Video", icon: "🎥" },
  ];

  return (
    <ScreenContainer className="p-4">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="gap-4">
          {/* Header */}
          <View className="gap-2">
            <Text className="text-2xl font-bold text-foreground">
              Learn & Grow
            </Text>
            <Text className="text-sm text-muted">
              Master elite branding and business
            </Text>
          </View>

          {!selectedCourse ? (
            <>
              {/* Courses Section */}
              <View className="gap-3">
                <Text className="text-lg font-bold text-foreground">
                  Learning Paths
                </Text>

                {courses.map((course) => (
                  <TouchableOpacity
                    key={course.id}
                    onPress={() => setSelectedCourse(course.id)}
                    className="bg-surface rounded-lg p-4 border border-border"
                  >
                    <View className="gap-2">
                      <View className="flex-row items-start justify-between">
                        <View className="flex-1 gap-1">
                          <View className="flex-row items-center gap-2">
                            <Text className="text-2xl">{course.icon}</Text>
                            <Text className="text-base font-semibold text-foreground flex-1">
                              {course.title}
                            </Text>
                          </View>
                          <Text className="text-sm text-muted">
                            {course.description}
                          </Text>
                        </View>
                      </View>

                      {/* Progress Bar */}
                      <View className="gap-1">
                        <View className="flex-row items-center justify-between">
                          <Text className="text-xs text-muted">
                            {course.modules} modules
                          </Text>
                          <Text className="text-xs font-semibold text-primary">
                            {course.progress}%
                          </Text>
                        </View>
                        <View className="h-2 bg-border rounded-full overflow-hidden">
                          <View
                            className="h-full bg-primary rounded-full"
                            style={{ width: `${course.progress}%` }}
                          />
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Resources Section */}
              <View className="gap-3">
                <Text className="text-lg font-bold text-foreground">
                  Premium Resources
                </Text>

                <View className="gap-2">
                  {resources.map((resource) => (
                    <TouchableOpacity
                      key={resource.id}
                      className="bg-surface rounded-lg p-4 border border-border flex-row items-center justify-between"
                    >
                      <View className="flex-row items-center gap-3 flex-1">
                        <Text className="text-2xl">{resource.icon}</Text>
                        <View className="flex-1 gap-1">
                          <Text className="text-sm font-semibold text-foreground">
                            {resource.title}
                          </Text>
                          <Text className="text-xs text-muted">
                            {resource.type}
                          </Text>
                        </View>
                      </View>
                      <Text className="text-primary">→</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Certification Path */}
              <View className="gap-3">
                <Text className="text-lg font-bold text-foreground">
                  Certification Path
                </Text>
                <View className="bg-gradient-to-r from-primary to-primary bg-opacity-10 rounded-lg p-4 border border-primary border-opacity-30">
                  <View className="gap-2">
                    <Text className="text-sm font-bold text-primary">
                      🏆 Elite Creator Certification
                    </Text>
                    <Text className="text-xs text-muted">
                      Complete all courses and earn your certification badge
                    </Text>
                    <View className="flex-row gap-2 mt-2">
                      {[1, 2, 3, 4, 5].map((badge) => (
                        <View
                          key={badge}
                          className={`w-10 h-10 rounded-full items-center justify-center ${
                            badge <= 2 ? "bg-primary" : "bg-border"
                          }`}
                        >
                          <Text className="text-xs font-bold text-background">
                            {badge}
                          </Text>
                        </View>
                      ))}
                    </View>
                  </View>
                </View>
              </View>
            </>
          ) : (
            <>
              {/* Course Detail */}
              <View className="gap-4">
                <View className="flex-row items-center justify-between">
                  <Text className="text-lg font-bold text-foreground">
                    {courses.find((c) => c.id === selectedCourse)?.title}
                  </Text>
                  <TouchableOpacity onPress={() => setSelectedCourse(null)}>
                    <Text className="text-primary font-semibold">Back</Text>
                  </TouchableOpacity>
                </View>

                {/* Course Modules */}
                <View className="gap-2">
                  {[1, 2, 3, 4, 5].map((module) => (
                    <TouchableOpacity
                      key={module}
                      className="bg-surface rounded-lg p-4 border border-border"
                    >
                      <View className="flex-row items-center justify-between">
                        <View className="flex-1 gap-1">
                          <Text className="text-base font-semibold text-foreground">
                            Module {module}: Key Concepts
                          </Text>
                          <Text className="text-sm text-muted">
                            15-20 minutes
                          </Text>
                        </View>
                        <View className="w-6 h-6 rounded-full border-2 border-border items-center justify-center">
                          {module <= 2 && (
                            <View className="w-3 h-3 bg-success rounded-full" />
                          )}
                        </View>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>

                {/* Start Course Button */}
                <TouchableOpacity className="bg-primary rounded-lg p-4 items-center mt-4">
                  <Text className="text-background font-semibold">
                    Continue Learning
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
