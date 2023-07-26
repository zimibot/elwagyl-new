import JSZip from "jszip";
import axios from "axios";
import { saveAs } from "file-saver";
import { toast } from "react-hot-toast";
import CountUp from "react-countup";
import { ModalSuccess } from "../components.eha/modal";

export const convertZip = async (nameZip, checkAssets, data, loading) => {

  const style = {
    background: "#333",
    color: "#fff",
    fontSize: 20,
    borderRadius: 0,
  };

  const zip = new JSZip();
  let completedDownloads = 0;
  let isErrorOrTimeoutOccurred = false; // Track if an error or timeout occurred

  const download = async (item, onProgress) => {
    try {
      const response = await axios.get(item.url, {
        responseType: "blob",
        onDownloadProgress: (event) => onProgress(event, item.name)
      });
      zip.file(item.name, response.data);
      completedDownloads++;
      isErrorOrTimeoutOccurred = false
    } catch (error) {
      isErrorOrTimeoutOccurred = true;
      completedDownloads = 0
      if (error.response.status === 404) {
        ModalSuccess({
          title: <div>The asset <b>{item.name.split(".")[0]}</b> has not already scanned</div>,
          type: "error",
        });
      } else {
        if (axios.isCancel(error)) {
          toast.error(
            <div>Download timeout: {item.name}</div>,
            { position: "top-right", style }
          );
        } else {
          toast.error(
            <div>Error downloading file: {item.name}</div>,
            { position: "top-right", style }
          );
        }
      }

    }
  };

  const onProgress = (event, itemName) => {

    setTimeout(() => {
      if (isErrorOrTimeoutOccurred) {
        return;
      }
      const progress = Math.round((event.loaded * 100) / event.total);
      const toastId = `download-progress`;
      toast.loading(
        <div className="text-lg">
          Progress Download: <CountUp end={progress} />% |{" "}
          {completedDownloads + 1} of {checkAssets.length}
        </div>,
        { id: toastId, position: "top-right", style }
      );

      if (progress === 100) {
        setTimeout(() => {
          if (completedDownloads === checkAssets.length) {
            toast.dismiss(toastId);
          }
          const successToastId = `download-success`;
          toast.success(
            <div className="text-lg">
              {completedDownloads} of {checkAssets.length} | Complete Download
              Files <span className="text-blue font-bold"> {itemName}</span>{" "}
            </div>,
            { id: successToastId, position: "top-right", style }
          );
        }, 1000);
      }
    }, 600);

  };

  const delay = (ms) => {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  };

  const downloadAll = async () => {
    for (let i = 0; i < data.length; i++) {
      if (isErrorOrTimeoutOccurred) {
        return Promise.reject(new Error("Error or timeout occurred."));
      }

      const currentItem = data[i];
      await download(currentItem, onProgress);
      await delay(1000);
    }

    if (!isErrorOrTimeoutOccurred) {
      const toastId = "generate-success";
      try {
        const blob = await zip.generateAsync({ type: "blob" });
        saveAs(blob, `${nameZip}.zip`);
        toast.dismiss(toastId);
        return "GENERATE PDF SUCCESS";
      } catch (error) {
        toast.error(<div className="text-lg">Error generating the zip file.</div>, { position: "top-right", style });
        throw new Error("Error generating the zip file.");
      }
    } else {
      return Promise.reject(new Error("GENERATE PDF ERROR"));

    }
  };

  toast.promise(
    downloadAll(),
    {
      success: () => {
        loading(() => ({
          assets: false,
          comparison: false,
        }));
        return isErrorOrTimeoutOccurred ? "GENERATE PDF ERROR" : "GENERATE PDF SUCCESS";
      },
      error: (error) => {
        toast.dismiss();
        loading((d) => ({
          assets: false,
          comparison: false,
        }));
        completedDownloads = 0
        return "GENERATE PDF ERROR";
      },
      loading: "LOADING GENERATE PDF",
    },
    { style, duration: 5000 }
  );
};
