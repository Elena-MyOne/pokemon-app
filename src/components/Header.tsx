import React from 'react';
import { CiSearch } from 'react-icons/ci';

interface HeaderProps {
  value: string;
  handleSearch(query: string): Promise<void>;
}

export default class Header extends React.Component<HeaderProps, { value: string }> {
  constructor(props: HeaderProps) {
    super(props);
    this.state = {
      value: props.value || '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSearchButton = this.handleSearchButton.bind(this);
    this.handleSearchForm = this.handleSearchForm.bind(this);
  }

  componentDidMount(): void {
    const savedValue = localStorage.getItem('PockemonCo') || '';
    this.setState({ value: savedValue });
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
    const { value } = this.state;
    handleSearch(value);
  }

  render() {
    const { value } = this.state;

    return (
      <header className="flex m-auto gap-4 border-b border-gray-200 p-0 py-4 md:container justify-between items-center">
        <div className="font-bold text-yellow-400 text-xl">Pokémon</div>
        <form onSubmit={this.handleSearchForm}>
          <div className="flex items-center">
            <input
              type="text"
              className="grow border-gray-300 border-[1px] p-2"
              placeholder="Search for pokemon..."
              value={value}
              onChange={this.handleChange}
            />
            <button
              className="text-2xl cursor-pointertext-black duration-300 border-[1px] border border-transparent bg-yellow-300 hover:bg-yellow-400 p-2"
              onClick={this.handleSearchButton}
            >
              <CiSearch />
            </button>
          </div>
        </form>
      </header>
    );
  }
}
