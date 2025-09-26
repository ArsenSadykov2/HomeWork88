import {useRef, useState} from "react";
import Grid from "@mui/material/Grid";
import {Button, TextField} from "@mui/material";

interface Props {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    name: string;
    label: string;
}

const FileInput: React.FC<Props> = ({onChange, name, label = "Image"}) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [fileName, setFileName] = useState("");

    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files && e.target.files[0]) {
            setFileName(e.target.files[0].name);
        } else {
            setFileName("");
        }

        onChange(e);
    };

    const activateInput = () => {
        if(inputRef.current) {
            inputRef.current.click();
        }
    };

    return (
        <div>
            <input
                style={{display: 'none'}}
                type="file"
                name={name}
                onChange={onFileChange}
                ref={inputRef}
            />

            <Grid container spacing={2} direction="row" alignItems="center">
                <Grid>
                    <TextField
                        disabled
                        label={label}
                        value={fileName}
                        onClick={activateInput}
                    />
                </Grid>
                <Grid>
                    <Button variant="contained" color="secondary" onClick={activateInput}>
                        Browse
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
};

export default FileInput;