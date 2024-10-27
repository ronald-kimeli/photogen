
export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  albumCount?: number;
}

export interface Album {
  id: number;
  title: string;
  userId: number;
}

export interface Photo {
  id: number;
  title: string;
  albumId: number;
  url: string;
  thumbnailUrl: string
}

