import { AccountModel } from './Account';
import { CommunityModel } from './Community';

export interface CourseModel {
    id?: number;
    title: string;
    description: string;
    cover_url: string;
    files_url: string;
    video_url: string;

    category: string;

    owner?: AccountModel;
    community?: CommunityModel;

    price: number;
    is_free: boolean;
    status?: string;

    tier?: 'basic' | 'premium' | 'all';
    progress?: number;
    learns?: string[]

    duration: string;
    lessons: number;
    rating: number;

    enrolled_count?: number;

    enroll_start_at?: string;
    enroll_end_at?: string;

    uploadFiles?: File[];

    created_at?: string;
    updated_at?: string;
}
