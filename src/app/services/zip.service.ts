import * as JSZip from 'jszip';
import * as XLSX from 'xlsx';
import {Injectable} from "@angular/core";

@Injectable({
    providedIn: 'root',
})
export class ZipService {

    async readZipFile(file: File): Promise<{ data: any[], images: File[] }> {
        const zip = new JSZip();
        const data: any[] = [];
        const images: File[] = [];

        try {
            // Read ZIP file as binary
            const zipContent = await zip.loadAsync(file);

            // Collect promises for file processing
            const filePromises = Object.keys(zipContent.files).map(async (fileName) => {
                const file = zipContent.files[fileName];

                if (fileName.endsWith('.csv') || fileName.endsWith('.xls') || fileName.endsWith('.xlsx')) {
                    const fileData = await file.async('arraybuffer');
                    const jsonData = this.parseExcelOrCsv(fileData);
                    data.push(...jsonData);
                } else if (fileName.match(/\.(jpg|jpeg|png)$/)) {
                    const fileData = await file.async('blob');
                    const imageFile = new File([fileData], fileName, { type: this.getMimeType(fileName) });
                    images.push(imageFile);
                }
            });

            await Promise.all(filePromises);  // Ensure all files are processed before returning

            return { data, images };
        } catch (error) {
            console.error('Error reading ZIP file:', error);
            return { data: [], images: [] };
        }
    }

    private parseExcelOrCsv(fileData: ArrayBuffer): any[] {
        const workbook = XLSX.read(new Uint8Array(fileData), {type: 'array'});
        const sheetName = workbook.SheetNames[0]; // Read the first sheet
        const sheet = workbook.Sheets[sheetName];
        return XLSX.utils.sheet_to_json(sheet); // Convert sheet to JSON
    }

    private getFileExtension(fileName: string): string {
        return fileName.split('.').pop() || 'jpeg'; // Default to 'jpeg' if unknown
    }

    private getMimeType(fileName: string): string {
        const extension = fileName.split('.').pop()?.toLowerCase();
        switch (extension) {
            case 'jpg':
            case 'jpeg': return 'image/jpeg';
            case 'png': return 'image/png';
            default: return 'application/octet-stream'; // Fallback MIME type
        }
    }

}
