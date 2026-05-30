// src/components/NewsCard.tsx
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';

export interface NewsItem {
  id: string;
  title: string;
  date: string;
  imageUrl: any; // Accepts require('path/to/image') or { uri: '...' }
}

interface NewsCardProps {
  news: NewsItem;
  onPress?: () => void;
}

export const NewsCard = ({ news, onPress }: NewsCardProps) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <Image source={news.imageUrl} style={styles.image} resizeMode="cover" />
      <View style={styles.textContainer}>
        <Text style={styles.title} numberOfLines={2}>
          {news.title}
        </Text>
        <Text style={styles.date}>{news.date}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 220, // Set fixed width for the horizontal scroll
    backgroundColor: '#1E2F23', // Matches the dark greenish surface
    borderRadius: 16,
    marginRight: spacing.m,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#333333',
  },
  image: {
    width: '100%',
    height: 110,
  },
  textContainer: {
    padding: spacing.m,
  },
  title: {
    color: colors.text.primary,
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: spacing.s,
    lineHeight: 20,
  },
  date: {
    color: '#888888', // Light grey for the subtitle
    fontSize: 12,
  },
});