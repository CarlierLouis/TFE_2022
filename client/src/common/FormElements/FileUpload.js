import React, {useRef, useState, useEffect} from 'react';

import Button from './Button';
import './FileUpload.css';


const FileUpload = props => {
    const [file, setFile] = useState();
    const [previewUrl, setPreviewUrl] = useState();
    const [isValid, setIsValid] = useState(false);

    const filePickerRef = useRef();

    useEffect(() => {
        if(!file) {
            return;
        }
        const fileReader = new FileReader();
        fileReader.onload = () => {
            setPreviewUrl(fileReader.result);
        };
        fileReader.readAsDataURL(file);
    }, [file]);

    const pickedHandler = event => {
        let pickedFile;
        let fileIsValid = isValid;
        if(event.target.files && event.target.files.length === 1) {
            pickedFile = event.target.files[0];
            setFile(pickedFile);
            setIsValid(true);
            fileIsValid = true;
        }
        else {
            setIsValid(false);
            fileIsValid = false;
        }
        props.onInput(props.id, pickedFile, fileIsValid);
    };

    const pickFileHandler = () => {
        filePickerRef.current.click();
    };

    return (
        <div className="form-control">
            <input 
                id={props.id} 
                ref={filePickerRef}
                style={{display: 'none'}} 
                type="file" 
                accept=".pdf, .docx, .pptx"
                onChange={pickedHandler}
            />
            <div className="image-upload__preview">
                    {previewUrl &&
                    <div className='file-upload-preview-div' >
                        <p>Fichier ajouté !</p>
                    </div>}

                    {!previewUrl && !props.updatePreview &&
                    <Button type="button" onClick={pickFileHandler}>Ajouter un fichier</Button>}
                    
            </div>

            {previewUrl && 
            <Button type="button" onClick={pickFileHandler}>Choisir un autre fichier</Button>}

            {!isValid && <p>{props.errorText}</p>}
        </div>
    );
    
};

export default FileUpload;