import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import VideoCard from '../components/VideoCard';
import FakeYoutube from '../api/fakeYoutube';
import Youtube from '../api/youtube';

export default function Videos() {
    const { keyword } = useParams();
    const {
        isLoading,
        error,
        data:videos, 
    } = useQuery({
            queryKey: ['videos', keyword ?? 'popular'],
            queryFn: ()=> {
                const youtube = new FakeYoutube();
                // const youtube = new Youtube();
                return youtube.search(keyword);
            },
            staleTime: 60 * 1000,                      
        });
                
    return (
        <>
            <div>
                Videos page... <h2>Search Results for: {keyword ? `🔍${keyword}` : `🔥`}</h2>
            </div>
                {isLoading && <p>Loading...</p>}
                {error && <p>Something is wrong.... 😫</p>}
                {videos && (
                    <ul>
                        {videos.map((video) => (
                            <VideoCard key={video.id} video={video} />
                        ))}
                    </ul>
                )}
        </>
        
    );
}

