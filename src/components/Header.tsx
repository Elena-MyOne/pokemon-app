import React from "react";
import { CiSearch } from "react-icons/ci";

interface HeaderProps {
  value: string;
  handleSearch(): Promise<void>
}

export default class Header extends React.Component<HeaderProps, { value: string }> {
  constructor(props: HeaderProps) {
    super(props);
    this.state = {
      value: props.value || ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSearchButton = this.handleSearchButton.bind(this)
    this.handleSearchForm = this.handleSearchForm.bind(this)
  }

  componentDidMount(): void {
    const savedValue = localStorage.getItem('PockemonCo') || '';
    this.setState({ value: savedValue })
  }

  handleChange(event: React.FormEvent<HTMLInputElement>): void {
    const target = event.currentTarget.value;
    this.setState({ value: target });
  }

  handleSearchButton(): void {
    const { value } = this.state;
    localStorage.setItem('PockemonCo', value);
  }

  handleSearchForm(event: React.FormEvent) {
    event.preventDefault();
    const { handleSearch } = this.props;
    this.handleSearchButton();
    handleSearch();
  }

  render() {
    const { value } = this.state;

    return (
      <header className="navbar m-auto flex-col gap-4 border-b border-gray-200 p-0 py-2 md:container lg:flex-row justify-between">
        <div className="font-bold text-primary text-xl">Pokémon</div>
        <form onSubmit={this.handleSearchForm}>
          <label className="input input-bordered flex items-center gap-2">
            <input type="text" className="grow" placeholder="Search..." value={value} onChange={this.handleChange} />
            <button className="text-2xl text-gray-400 cursor-pointer hover:text-black duration-300" onClick={this.handleSearchButton}><CiSearch /></button>
          </label>
        </form>
      </header>
    )
  }
}