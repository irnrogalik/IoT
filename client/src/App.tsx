import "./App.css";

export default function App() {
  return (
    <>
      <div className="d-flex justify-content-center">
        <div className="row m-5 p-3 bg-secondary">
          <h3>
            <a
              href={"/device"}
              className="text-secondary-emphasis link-underline link-underline-opacity-0"
            >
              Devices
            </a>
          </h3>
        </div>
      </div>
    </>
  );
}
