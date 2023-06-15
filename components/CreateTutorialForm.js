import { useState } from 'react';
import { createTutorial } from './API.js';
import styles from './CreateTutorialForm.module.css';

const CreateTutorialForm = () => {
    const [title, setTitle] = useState('');
    const [link, setLink] = useState('');
    const [description, setDescription] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const tutorialData = {
                title,
                link,
                description,
                likes: 0,
            };

            setIsUploading(true);
            setError(null);

            await createTutorial(tutorialData);

            setTitle('');
            setLink('');
            setDescription('');

            setIsUploading(false);
        } catch (error) {
            console.error('Error creating tutorial:', error);
            setError('Failed to upload tutorial. Please try again.');
            setIsUploading(false);
        }
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.heading}>Create Tutorial</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.inputContainer}>
                    <label className={styles.label}>
                        Title:
                    </label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className={styles.input}
                    />
                </div>
                <div className={styles.inputContainer}>
                    <label className={styles.label}>
                        Link:
                    </label>
                    <input
                        type="text"
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                        className={styles.input}
                    />
                </div>
                <div className={styles.inputContainer}>
                    <label className={styles.label}>
                        Description:
                    </label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className={styles.textarea}
                    ></textarea>
                </div>
                {isUploading ? (
                    <p className={styles.message}>Uploading...</p>
                ) : (
                    <div>
                        {error && <p className={styles.error}>{error}</p>}
                        <button type="submit" className={styles.button}>Create</button>
                    </div>
                )}
            </form>
        </div>
    );
};

export default CreateTutorialForm;

