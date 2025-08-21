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
                    <ul className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 gap-y-4'>
                        {videos.map((video) => (
                            <VideoCard key={video.id} video={video} />
                        ))}
                    </ul>
                )}
        </>
        
    );
}

