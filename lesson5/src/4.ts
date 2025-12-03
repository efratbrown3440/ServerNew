import fs from 'fs';
import  path from 'path';

const DIRECTORY_PATH = 'src/files_to_read';
async function readFiles(): Promise<void> {
    console.log(`\n start`);
    
    try {
        
        const files: string[] = await fs.promises.readdir(DIRECTORY_PATH);
        
        console.log(` נמצאו ${files.length} קבצים .`);

        for (const file of files) {
            const filePath = path.join(DIRECTORY_PATH, file);
            const data: Buffer = await fs.promises.readFile(filePath);
            
           const content = data.toString();

        
            console.log(`\n תוכן הקובץ${file}`);
            console.log(content);
           
        }

        console.log("\n finish");

    } catch (error) {
        if (error instanceof Error && 'code' in error && error.code === 'ENOENT') {
            console.error(`  התיקייה '${DIRECTORY_PATH}' לא נמצאה.`);
        } else {
            console.error(" אירעה שגיאה כללית במהלך קריאת הקבצים:", error);
        }
    }
}

readFiles();