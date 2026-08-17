import windowWrapper from '#hoc/windowWrapper'
import { WindowControls } from '#components/index.js'
import { Download } from 'lucide-react'

import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

const RESUME_HEIGHT = 376;
const RESUME_WIDTH = 450;

const Resume = () => {
  return (
    <>
      <div id='window-header'>
        <WindowControls target="resume" />
        <h2>Resume.pdf</h2>

        <a href="files/resume.pdf" download className='cursor-pointer' title='Download resume'>
          <Download className='icon' />
        </a>
      </div>
      <Document file="files/resume.pdf">
        <Page
          pageNumber={1}
          height={RESUME_HEIGHT}
          width={RESUME_WIDTH}
          renderTextLayer
          renderAnnotationLayer
        />
      </Document>
    </>
  )
}

const ResumeWindow = windowWrapper(Resume, "resume")

export default ResumeWindow