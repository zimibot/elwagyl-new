import JSZip from "jszip";
import axios from "axios";
import { saveAs } from "file-saver";
import { toast } from "react-hot-toast";
import CountUp from "react-countup";

export const convertZip = (nameZip,checkAssets, data, loading) => {
  const style = {
    background: "#333",
    color: "#fff",
    fontSize: 20,
    borderRadius: 0,
  };

  const zip = new JSZip();
  let completedDownloads = 0;
  let isErrorOccurred = false; // Track if an error occurred

  const download = (item, onProgress) => {
    // download single file as blob and add it to zip archive
    return axios
      .get(item.url, {
        responseType: "blob",
        onDownloadProgress: (event) => onProgress(event, item.name), // Pass item name for unique toast ID
      })
      .then((resp) => {
        zip.file(item.name, resp.data);
        completedDownloads++; // Increment the counter when a file is downloaded
      })
      .catch((error) => {
        isErrorOccurred = true; // Set the error flag to true
        toast.error(
          <div className="text-lg">Error downloading file: {item.name}</div>,
          {
            position: "top-right",
            style,
          }
        );
      });
  };

  const onProgress = (event, itemName) => {
    const progress = Math.round((event.loaded * 100) / event.total);
    const toastId = `download-progress`; // Create a unique toast ID based on file name

    // Dismiss previous toast with same ID
    // toast.dismiss(toastId);

    // Show new toast
    toast.loading(
      <div className="text-lg">
        Progress Download: <CountUp end={progress} />% |{" "}
        {completedDownloads + 1} of {checkAssets.length}
      </div>,
      {
        id: toastId,
        position: "bottom-right",
        style,
      }
    );
    if (progress === 100) {
      // If progress is 100%, wait for 1 second then show success notification
      setTimeout(() => {
        if (completedDownloads === checkAssets.length) {
          toast.dismiss(toastId);
        }
        const successToastId = `download-success`;
        toast.success(
          <div className="text-lg">
            {" "}
            {completedDownloads} of {checkAssets.length} | Complete Download
            Files <span className="text-blue font-bold"> {itemName}</span>{" "}
          </div>,
          {
            id: successToastId,
            position: "top-right", // Show success notification for 3 seconds
            style,
          }
        );
        // Dismiss success notification after showing it for 3 seconds
      }, 1000);
    }
  };

  const delay = (ms) => {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  };

  const downloadAll = () => {
    const queue = (index) => {
      if (index >= data.length) {
        // All tasks are completed, generate the zip file
        zip.generateAsync({ type: "blob" }).then(function (blob) {
          saveAs(blob, `${nameZip}.zip`);
        });
        return Promise.resolve("GENERATE PDF SUCCESS");
      }

      const currentItem = data[index];
      const downloadPromise = download(currentItem, onProgress);

      return downloadPromise
        .then(() => {
          // Task completed, wait for 1 second before starting the next task
          return delay(1500).then(() => queue(index + 1));
        })
        .catch((error) => {
          isErrorOccurred = true; // Set the error flag to true
          toast.error(<div className="text-lg">Error downloading files.</div>, {
            position: "top-right",
            style,
          });
          throw new Error("Error downloading files."); // Throw an error to stop the queue
        });
    };

    toast.promise(
      queue(0),
      {
        success: () => {
          loading((d) => ({
            assets: false,
            comparison: false,
          }));
          if (isErrorOccurred) {
            return "GENERATE PDF ERROR";
          } else {
            return "GENERATE PDF SUCCESS";
          }
        },
        error: () => {
          loading((d) => ({
            assets: false,
            comparison: false,
          }));
          return "GENERATE PDF ERROR";
        },
        loading: "LOADING GENERATE PDF",
      },
      {
        style,
      }
    );
  };

  return downloadAll();
};
