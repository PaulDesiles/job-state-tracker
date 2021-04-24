import React, { FunctionComponent, useState, useRef, useEffect } from 'react';
import { OrganizerState } from './Organizer';

interface ExporterProps {
    getState: () => OrganizerState,
    setState: (state: OrganizerState) => void;
};


const Exporter: FunctionComponent<ExporterProps> = 
({ getState, setState }) => {
    const hiddenRef = useRef<HTMLAnchorElement>(null);
    const [ dlUrl, setDlUrl ] = useState("");

    useEffect(() => {
        if (dlUrl && hiddenRef?.current) {
            hiddenRef.current.click(); 
            URL.revokeObjectURL(dlUrl);  // free up storage--no longer needed.
            setDlUrl("")
        }
    }, [dlUrl, hiddenRef]);

    let exportAsJson: () => void =
        function () {
            var serialized = JSON.stringify(getState());
            const blob = new Blob([serialized]);
            const url = URL.createObjectURL(blob);
            setDlUrl(url);
        };

    return (<div style={{ display: 'flex'}}>
        <a style={{ display: 'none' }}
             download="export.json"
             href={dlUrl}
             ref={hiddenRef}
        >download it</a>

        <button style={{ margin: '0 10px 10px 0'}} onClick={exportAsJson}>Export as json</button>
    </div>);
}


export default Exporter;