import ReactDOM from "react-dom";


type SettingsPortalProps = {
  children: JSX.Element;
};

const SettingsPortal = ({ children }: SettingsPortalProps) => {
  return ReactDOM.createPortal(
    children,
    document.getElementById("app-root") as HTMLImageElement
  );
};
export default SettingsPortal;
