import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import VideoCard from '../components/VideoCard';
import { useYoutubeApi } from '../context/YoutubeApiContext';

export default function Videos() {
    const { keyword } = useParams();
    const { youtube } = useYoutubeApi();
    const {
        isLoading,
        error,
        data:videos, 
    } = useQuery({
            queryKey: ['videos', keyword ?? 'popular'],
            queryFn: () => {
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

