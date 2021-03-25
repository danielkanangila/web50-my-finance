import React from 'react';

const defaultStyle = {
    ul: 'w-full list-none border border-gray-200 rounded-lg divide-y divide-gray-200',
    li: 'flex justify-between py-2 px-3',
}

const List = ({ data=[], styles=defaultStyle }) => {
    return (
        <ul className={styles.ul}>
            {data.map((item, index) => (<li key={index} className={styles.li}>{item}</li>))}
        </ul>
    );
};

export default List;