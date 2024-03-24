import { FC } from 'react';
import './style.css';

interface Props {
    tagsList?: string[];
}

export const Tags: FC<Props> = ({ tagsList }) => {
    return (
        <div className='tags-container'>
            {tagsList &&
                tagsList.map((tag) => (
                    <p key={tag} className='tag'>
                        #{tag}
                    </p>
                ))}
        </div>
    );
};

export default Tags;
