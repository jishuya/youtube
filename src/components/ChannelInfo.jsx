import React from 'react';
import { useYoutubeApi } from '../context/YoutubeApiContext';
import { useQuery } from '@tanstack/react-query';

export default function ChannelInfo({ id, name }) {
    const { youtube } = useYoutubeApi();
    const { 
        data: url
     } = useQuery({
         queryKey: ['channel', id],
         queryFn: () => youtube.channelImageURL(id),
         staleTime: 60 * 1000,   
     });
    return (
        <div>
            { url && <img src={url} alt={name} /> }
            <p>{id}</p>
        </div>
    );
}

