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
            // alert('Ваш запит не коректний');
      this.props.value();
      return;
        }
        this.props.onSubmit(this.state.searchQuery);
         this.setState({ searchQuery: '' });
    }

    render() {
        return (
            <SearchbarHeader>
  <SearchForm onSubmit={this.formSubmite}>
    <SearchFormButton  type="submit" >
      <SearchFormButtonLabel>Search</SearchFormButtonLabel>
    </SearchFormButton>

    <SearchFormInput 
      type="text"
      autocomplete="off"
      autofocus
                        placeholder="Search images and photos"
                        value={this.state.searchQuery}
                        onChange={this.onInputChange}
    />
  </SearchForm>
</SearchbarHeader>
        )
    }
}