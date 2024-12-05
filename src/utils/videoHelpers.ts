import { videos } from '../data/videos';
import type { Video } from '../types/video';

export function getVideoThumbnail(videoId: string): string {
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
}

export function getVideoEmbedUrl(videoId: string): string {
  return `https://www.youtube.com/embed/${videoId}`;
}

export function getAllVideos(): Video[] {
  return videos;
}

export function getVideoById(id: string): Video | undefined {
  return videos.find(video => video.id === id);
}