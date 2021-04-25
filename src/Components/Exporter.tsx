import React, { FunctionComponent, useState, useRef, useEffect, ChangeEvent } from 'react';
import { OrganizerState } from './Organizer';

interface ExporterProps {
    getState: () => OrganizerState,
    setState: (state: OrganizerState) => void;
};


const Exporter: FunctionComponent<ExporterProps> = 
({ getState, setState }) => {
    const hiddenDownloadRef = useRef<HTMLAnchorElement>(null);
    const hiddenUploadRef = useRef<HTMLInputElement>(null);
    const [ dlUrl, setDlUrl ] = useState("");

    useEffect(() => {
        if (dlUrl && hiddenDownloadRef?.current) {
            hiddenDownloadRef.current.click(); 
            URL.revokeObjectURL(dlUrl);  // free up storage--no longer needed.
            setDlUrl("")
        }
    }, [dlUrl, hiddenDownloadRef]);

    let exportAsJson: () => void =
        function () {
            var serialized = JSON.stringify(getState());
            const blob = new Blob([serialized]);
            const url = URL.createObjectURL(blob);
            setDlUrl(url);
        };

    let importJson: (f: FileList | null) => void =
        function (files: FileList | null) {
            if (files && files[0]) {
                console.log('start import');
                const file = files[0];
                const reader = new FileReader();
                reader.onload = fileLoaded;
                reader.readAsText(file);
            } else {
                console.log('empty file : abort import');
            }
        };
    
    let fileLoaded: (e: ProgressEvent<FileReader>) => void =
        function (evt: ProgressEvent<FileReader>) {
            try {
                const fileContent = evt?.target?.result;
                if (fileContent) {
                    const newState = JSON.parse(fileContent as string);
                    if (newState && newState.applications && newState.archives) {
                        setState(newState);
                        console.log('imported');
                    } else {
                        console.log('invalid content');
                    }
                } else {
                    console.log('null target content');
                }
            } catch (error) {
                console.log(error);
            }
        };

    return (<div style={{ display: 'flex'}}>
        <button style={{ margin: '0 10px 10px 0'}} onClick={exportAsJson}>Export as json</button>
        <button style={{ margin: '0 10px 10px 0'}} onClick={() => hiddenUploadRef.current?.click()}>Import json</button>

        <a style={{ display: 'none' }}
             download="export.json"
             href={dlUrl}
             ref={hiddenDownloadRef}
        >download it</a>

        <input type="file" 
            style={{ display: 'none' }}
            multiple={false}
            accept=".json,application/json"
            onChange={evt => importJson(evt.target.files)}
            ref={hiddenUploadRef}
          />
    </div>);
}


export default Exporter;