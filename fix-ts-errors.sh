#!/bin/bash

# Fix animation-utils.ts - toValue
sed -i 's/toValue: number,/\/\/ toValue: number, \/\/ Animation target value/' lib/animations/animation-utils.ts

# Fix enhanced-spiritual-companion.tsx - blink
sed -i 's/const blink = useSharedValue/\/\/ const blink = useSharedValue/' components/ui/enhanced-spiritual-companion.tsx

# Fix api.ts - ApiResponse
sed -i 's/export interface ApiResponse/\/\/ export interface ApiResponse/' lib/_core/api.ts

# Fix websocket-service.ts - url (keep property but mark as used)
sed -i 's/private url: string;/private url: string; \/\/ WebSocket connection URL/' lib/services/websocket-service.ts

echo "✅ Batch fixes applied"
