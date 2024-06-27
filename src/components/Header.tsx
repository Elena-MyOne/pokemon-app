import React from "react";
import { CiSearch } from "react-icons/ci";

interface HeaderProps {
  value: string;
}

export default class Header extends React.Component<HeaderProps, { value: string }> {
  constructor(props: HeaderProps) {
    super(props);
    this.state = {
      value: props.value || ''
    }
  }

  render() {
    return (
      <header className="navbar m-auto flex-col gap-4 border-b border-gray-200 p-0 py-2 md:container lg:flex-row justify-between">
        <div className="font-bold text-primary text-xl">Pekomon.co</div>
        <label className="input input-bordered flex items-center gap-2">
          <input type="text" className="grow" placeholder="Search" />
          <span className="text-2xl text-gray-400 cursor-pointer"><CiSearch /></span>
        </label>
      </header>
    )
  }
}