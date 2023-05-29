import { Component } from 'react';
import { SearchbarHeader,SearchForm, SearchFormButton,SearchFormButtonLabel,SearchFormInput  } from './Searchbar.styled';

export default class Searchbar extends Component{
    state = {
          searchQuery: '',
    }

    onInputChange = (e) => {
        this.setState({ searchQuery: e.currentTarget.value.toLowerCase().trim() });
    };

  formSubmite = e => {
    e.preventDefault();
    if (this.state.searchQuery.trim() === '') {
      this.props.value();
      return;
    }
    this.props.onSubmit(this.state.searchQuery);
    
    this.resetInput();
  };

   resetInput = () => {
    this.setState({ searchQuery: '' });
  };


    render() {
        return (
            <SearchbarHeader>
  <SearchForm onSubmit={this.formSubmite}>
    <SearchFormButton  type="submit" >
      <SearchFormButtonLabel>Search</SearchFormButtonLabel>
    </SearchFormButton>

    <SearchFormInput 
      type="text"
      autoComplete="off"
      autoFocus
                        placeholder="Search images and photos"
                        value={this.state.searchQuery}
                        onChange={this.onInputChange}
    />
  </SearchForm>
</SearchbarHeader>
        )
    }
};