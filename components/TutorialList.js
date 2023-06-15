import React, {useEffect, useRef, useState} from 'react';
import ReactPlayer from 'react-player';
import styles from './TutorialList.module.css';
import {getAllTutorials} from './API.js';
import Link from "next/link";


const TutorialList = () => {
    const [isClient, setIsClient] = useState(false);
    const playerRef = useRef(null);

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (playerRef.current) {
            playerRef.current.forceUpdate();
        }
    }, [isClient]);

    const [tutorials, setTutorials] = useState(null);

    useEffect(() => {
        fetchTutorials()
            .catch((error) => {
                console.error('Error retrieving tutorials:', error);
            });
    }, []);

    const fetchTutorials = () => {
        return getAllTutorials()
            .then((tutorialsData) => {
                setTutorials(tutorialsData);
            })
            .catch((error) => {
                console.error('Error retrieving tutorials:', error);
            });
    };

    return (
        <div>
            <h1>Tutorials</h1>
            {tutorials ? (<div className={styles.container}>
                {tutorials.map((tutorial) => (
                    <Link key={tutorial.id} href={`/tutorials/${tutorial.id}`}>
                        <div className={styles.card}>
                            <h2>{tutorial.title}</h2>
                            {isClient ? (
                                <div className={styles['react-player-wrapper']}>
                                    <ReactPlayer
                                        ref={playerRef}
                                        url={tutorial.link}
                                        controls={true}
                                        className={styles['react-player']}
                                    />
                                </div>
                            ) : (
                                <div className={styles['player-container']}>
                                    <div className={styles['player-wrapper']}>
                                    </div>
                                </div>
                            )}

                            <p>likes: {tutorial.likes ? tutorial.likes : "0"}</p>
                        </div>
                    </Link>
                ))}
            </div>) : (<p>Loading...</p>)}
        </div>
    );
};

export default TutorialList;




