/**
 * This file will hold the Menu that lives at the top of the Page, this is all rendered using a React Component...
 *
 */
import React, { createRef } from "react";
import { ProductsContext } from "../context/productsContext";
import { debounce } from "../utils";

class Menu extends React.PureComponent {
  inputSearchRef;
  static contextType = ProductsContext;
  /**
   * Main constructor for the Menu Class
   * @memberof Menu
   */
  constructor(props) {
    super(props);
    this.state = {
      showingSearch: props.showingSearch || false,
      drawSearchBar: props.drawSearchBar || true,
    };
    console.log(this.state);
    this.inputSearchRef = createRef();
    this.search = debounce(this.searchProduct, 500);
  }

  /**
   * Shows or hides the search container
   * @memberof Menu
   * @param e [Object] - the event from a click handler
   */
  showSearchContainer(e) {
    e.preventDefault();
    this.setState({
      showingSearch: !this.state.showingSearch,
      drawSearchBar: true
    });
  }

  /**
   * Calls upon search change
   * @memberof Menu
   * @param e [Object] - the event from a text change handler
   */
  onSearch(e) {
    const { value } = e.target;
    this.context.searchTerm = value;
    if (value) {
      this.search(value);
    } else {
      this.context.resetProducts();
    }
  }

  searchProduct = (value) => {
    this.context.searchProducts(value);
    this.inputSearchRef.current.value = '';
  };

  /**
   * Renders the default app in the window, we have assigned this to an element called root.
   *
   * @returns JSX
   * @memberof App
   */
  render() {
    return (
      <header className="menu">
        <div className="menu-container">
          <div className="menu-holder">
            <h1>ELC</h1>
            <nav>
              <a href="#" className="nav-item">
                HOLIDAY
              </a>
              <a href="#" className="nav-item">
                WHAT'S NEW
              </a>
              <a href="#" className="nav-item">
                PRODUCTS
              </a>
              <a href="#" className="nav-item">
                BESTSELLERS
              </a>
              <a href="#" className="nav-item">
                GOODBYES
              </a>
              <a href="#" className="nav-item">
                STORES
              </a>
              <a href="#" className="nav-item">
                INSPIRATION
              </a>

              <a href="#" onClick={(e) => this.showSearchContainer(e)}>
                <i className="material-icons search">search</i>
              </a>
            </nav>
          </div>
        </div>

        <div id="searchBar"
          className={
            (this.state.showingSearch ? "showing " : "") + "search-container"
          }
        >
          <input type="text" onChange={(e) => this.onSearch(e)} ref={this.inputSearchRef} />
          <a href="#" onClick={(e) => this.showSearchContainer(e)}>
            <i className="material-icons close">close</i>
          </a>


        </div>
        )
      </header>
    );
  }
}

// Export out the React Component
module.exports = Menu;
