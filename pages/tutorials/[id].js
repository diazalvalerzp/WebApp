import {useRouter} from 'next/router';
import React, {useEffect, useRef, useState} from 'react';
import {getTutorialById, getAllTutorials, updateTutorial} from '../../components/API.js';
import styles from "./TutorialPage.module.css";
import ReactPlayer from "react-player";
import {faPenToSquare} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const TutorialPage = () => {
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

    const router = useRouter();
    const {id} = router.query;
    const [tutorial, setTutorial] = useState(null);
    const [editedTutorial, setEditedTutorial] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (id) {
            fetchTutorial(id)
                .catch((error) => {
                    console.error('Error retrieving tutorial:', error);
                });
        }
    }, [id]);

    const fetchTutorial = async (id) => {
        return getTutorialById(id)
            .then((tutorialsData) => {
                setTutorial(tutorialsData[0]);
                setEditedTutorial(tutorialsData[0]);
                console.log(tutorialsData);
            })
            .catch((error) => {
                console.error('Error retrieving tutorial:', error);
            });
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSave = async () => {
        try {
            setIsSaving(true);
            setError(null);

            // Perform the update request to update the tutorial
            console.log(editedTutorial);

            setEditedTutorial({ ...editedTutorial, likes: "0" })
            await updateTutorial(id, editedTutorial);

            // Handle the successful update, such as showing a success message or redirecting to the tutorial page
            console.log('Tutorial updated successfully!');
            setIsEditing(false);
            setTutorial(editedTutorial);
        } catch (error) {
            setError('Error updating tutorial. Please try again.');
            console.error('Error updating tutorial:', error);
        } finally {
            setIsSaving(false);
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
    };

    return (
        <div>
            {tutorial ? (
                <div>
                    {!isEditing ? (
                        <div className={styles['container']}>
                            <FontAwesomeIcon className={styles.editIcon} icon={faPenToSquare}
                                             onClick={handleEditClick}/>
                            <h2>{tutorial.title}</h2>
                            <p>{tutorial.description}</p>
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
                        </div>
                    ) : (
                        <div className={styles.containerForm}>
                            <h2 className={styles.heading}>Edit Tutorial</h2>
                            <div className={styles.form}>
                                <div className={styles.inputContainer}>
                                    <label className={styles.label}>
                                        Title:
                                    </label>
                                    <input
                                        type="text"
                                        value={editedTutorial.title}
                                        onChange={(e) => setEditedTutorial({ ...editedTutorial, title: e.target.value })}
                                        className={styles.input}
                                    />
                                </div>
                                <div className={styles.inputContainer}>
                                    <label className={styles.label}>
                                        Link:
                                    </label>
                                    <input
                                        type="text"
                                        value={editedTutorial.link}
                                        onChange={(e) => setEditedTutorial({ ...editedTutorial, link: e.target.value })}
                                        className={styles.input}
                                    />
                                </div>
                                <div className={styles.inputContainer}>
                                    <label className={styles.label}>
                                        Description:
                                    </label>
                                    <textarea
                                        value={editedTutorial.description}
                                        onChange={(e) => {setEditedTutorial({ ...editedTutorial, description: e.target.value });console.log(editedTutorial);}}
                                        className={styles.textarea}
                                    ></textarea>
                                </div>
                                <div className={styles.buttonContainer}>
                                    <button onClick={handleSave} disabled={isSaving} className={styles.button}>
                                        {isSaving ? 'Saving...' : 'Save'}
                                    </button>
                                    <button onClick={handleCancel} className={styles.button} >Cancel</button>
                                </div>
                            </div>
                            {error && <p>{error}</p>}
                        </div>
                    )}
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );

};

export default TutorialPage;
