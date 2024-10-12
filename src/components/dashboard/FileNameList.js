import React, { useState, useEffect } from "react";
import { Table, Button, Spinner } from "react-bootstrap";
import utilsStyle from "../../styles/utils/utils.module.css";
import axios from "axios";

const FileNameList = ({ fileNames, onDeleteSuccess, isLoading }) => {
  const [deleting, setDeleting] = useState({}); // Track which files are being deleted

  // Log the filenames prop whenever it changes
  useEffect(() => {
    console.log("File names prop changed:", fileNames);
  }, [fileNames]); // Dependency array to run effect when fileNames changes

  const handleDelete = async (id, retries = 3) => {
    setDeleting({ ...deleting, [id]: true });

    try {
      await axios.delete(`filenames/delete/${id}`);
      console.log(`File with ID ${id} deleted successfully.`);

      if (onDeleteSuccess) {
        onDeleteSuccess();
      }
    } catch (error) {
      console.error(`Error deleting file with ID ${id}:`, error);
      if (retries > 0) {
        console.log(
          `Retrying deletion for file ID ${id} (${retries} retries left)...`
        );
        await new Promise((resolve) => setTimeout(resolve, 1000));
        handleDelete(id, retries - 1);
      } else {
        if (error.response) {
          alert(
            `Failed to delete file with ID ${id}: ${
              error.response.data.message || "Unknown error"
            }`
          );
        } else {
          alert(`Failed to delete file with ID ${id}. Please try again later.`);
        }
      }
    } finally {
      setDeleting((prev) => ({ ...prev, [id]: false }));
    }
  };

  // Fill the table with exactly 10 rows, even if some rows are empty
  const filledFileNames = [...fileNames];
  while (filledFileNames.length < 10) {
    filledFileNames.push({
      id: `empty-${filledFileNames.length}`,
      file_name: "",
    });
  }

  return (
    <div className="table-responsive-sm">
      <Table striped hover size="sm" className="table-sm table-borderless">
        {" "}
        {/* Smaller table without borders */}
        <thead>
          <tr>
            <th>#</th>
            <th>File Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filledFileNames.map((fileName, index) => (
            <tr key={fileName.id}>
              <td className="p-2">{index + 1}</td>
              <td className="align-middle p-2">
                <span className={utilsStyle.truncateFade}>
                  {fileName.file_name || "—"}
                </span>
              </td>
              <td>
                {fileName.file_name && (
                  <Button
                    onClick={() => handleDelete(fileName.id)}
                    disabled={deleting[fileName.id]}
                    size="sm"
                    style={{
                      backgroundColor: "transparent",
                      border: "none",
                      padding: 0,
                    }} // Transparent button
                  >
                    {deleting[fileName.id] ? (
                      <>
                        <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                          variant="primary"
                        />{" "}
                        ...
                      </>
                    ) : (
                      <i
                        className="fa-solid fa-trash-can"
                        style={{ fontSize: "1.2rem" }}></i>
                    )}
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default FileNameList;
