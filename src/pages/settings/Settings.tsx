import React, { useState } from "react";
import SettingsPortal from "../../components/SettingsPortal/SettingsPortal";
import Cross from "../../static/Cross.svg";
import styles from "./styles.module.css";
import { Modal, Button } from "react-bootstrap";


const Settings = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <SettingsPortal>
        <h1>settings modal</h1>
      {/* <React.Fragment>
        <Button variant="primary" onClick={handleShow}>
          Launch demo modal
        </Button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </React.Fragment> */}
    </SettingsPortal>
  );
};
export default Settings;
