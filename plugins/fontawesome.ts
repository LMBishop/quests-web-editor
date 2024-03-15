import { library, config } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
  faAppleWhole,
  faArrowLeft,
  faBoxesStacked,
  faBuildingColumns,
  faCaretDown,
  faCheck,
  faChevronRight,
  faCode,
  faCodeBranch,
  faCopy,
  faCube,
  faCubes,
  faCubesStacked,
  faDownload,
  faFileExport,
  faFileImport,
  faFileZipper,
  faFlaskVial,
  faFolder,
  faFolderOpen,
  faHardDrive,
  faPen,
  faPencil,
  faPlus,
  faSave,
  faTag,
  faTrash,
  faTrowel,
  faUpload,
  faWrench,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { faCompass } from '@fortawesome/free-regular-svg-icons';

config.autoAddCss = false;

// fas
library.add(faPlus);
library.add(faCheck);
library.add(faCubes);
library.add(faCubesStacked);
library.add(faXmark);
library.add(faSave);
library.add(faFileExport);
library.add(faFileImport);
library.add(faDownload);
library.add(faUpload);
library.add(faFolder);
library.add(faPencil);
library.add(faCodeBranch);
library.add(faFolderOpen);
library.add(faFlaskVial);
library.add(faTrash);
library.add(faCaretDown);
library.add(faFileZipper);
library.add(faWrench);
library.add(faHardDrive);
library.add(faArrowLeft);
library.add(faChevronRight);
library.add(faCode);
library.add(faCopy);
library.add(faPen);
library.add(faTag);
library.add(faAppleWhole);
library.add(faCube);

// task type icons
library.add(faTrowel);
library.add(faBuildingColumns);
library.add(faBoxesStacked);

// far
library.add(faCompass);

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('font-awesome-icon', FontAwesomeIcon, {});
});
