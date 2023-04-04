import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
// import { CircularProgress } from "@mui/material";
import Switch from "./components/Switch/Switch";
import { Switch as HuiSwitch } from "@headlessui/react";
import Input from "./components/Input/Input";
import { Form } from "react-bootstrap";
import { Listbox } from "@headlessui/react";
import  Image  from './components/Image/Image';
import SwitchUnstyled from "@mui/base/SwitchUnstyled";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="grid place-content-center gap-4">
      <SwitchUnstyled>Base Button</SwitchUnstyled>
      <Image />
      <Switch className="bg-gray-500 ui-checked:bg-blue-500 overflow-hidden duration-150" />
      <Input className="form-control w-full border-red-500 focus:border-red-500 " />
      <Input className="form-control form-control-sm" />
      <Input className="form-control form-control-lg" />
      <select className="form-select">
        <option>first</option>
        <option>second</option>
        <option>third</option>
      </select>
      <Listbox>
        <Listbox.Button className="form-select">listbox</Listbox.Button>
        <Listbox.Options>
          <Listbox.Option value="first">first</Listbox.Option>
          <Listbox.Option value="first">first</Listbox.Option>
          <Listbox.Option value="first">first</Listbox.Option>
        </Listbox.Options>
      </Listbox>

      <span className="mui-spinner-z01bqi w-6 h-6" role="progressbar">
        <svg className="block" viewBox="22 22 44 44">
          <circle
            className="mui-spinner-14891ef"
            cx="44"
            cy="44"
            r="20.2"
            fill="none"
            stroke-width="3.6"
          ></circle>
        </svg>
      </span>

      <span className="spinner-border duration-300 text-green-600 w-12 h-12"></span>
      <span className="animate-pulse bg-green-600 rounded-full w-12 h-12"></span>
      <span className="animate-grow bg-green-600 rounded-full w-12 h-12"></span>

      <input type="checkbox" className="btn-check" />
      <input type="range" className="form-range" />
      <input type="range" />
      <button className="btn-close" />
      <p className="placeholder-glow">
        <span className="placeholder w-full"></span>
      </p>
      <div className="form-floating">
        <label htmlFor="name">Name</label>
        <input id="name" className="form-control" placeholder="Enter name" />
      </div>

      <table className="table table-hover table-bordered w-[500px]">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Handle</th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          <tr className="table-active">
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td colSpan={2}>Larry the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default App;
