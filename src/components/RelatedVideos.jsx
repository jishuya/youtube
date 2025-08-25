import React from 'react';
import VideoCard from './VideoCard';
import { useYoutubeApi } from '../context/YoutubeApiContext';
import { useQuery } from '@tanstack/react-query';


export default function RelatedVideos({ id }) {
    const { youtube } = useYoutubeApi();
    const { 
        isLoading, 
        error, 
        data: videos 
    } = useQuery({
        queryKey: ['related', id],
        queryFn: () => youtube.relatedVideos(id),
        staleTime: 60 * 1000,   
    });
    return (
        <>
            <div>
                <h2>Related Videos</h2>
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

