import React, { Component } from "react";
import {
  getSingleListing,
  postListing,
  putListing,
  postImage,
  getListingImages
} from "../services/api_helper";

class EditListingsForm extends Component {
  constructor(props) {
    super(props);

    this.fileInput = React.createRef();
    this.state = {
      listingData: {},
      images: []
    };
  }

  async componentDidMount() {
    const [listingData, imageData] = await Promise.all([
      getSingleListing(this.props.id),
      getListingImages(this.props.id)
    ]);
    const images = imageData.map(image => image.url);
    this.setState({
      listingData,
      images
    });
  }

  handleChange = e => {
    const { name, value, type, checked } = e.target;
    let listingData = this.state.listingData;
    let newData;
    if (type === "checkbox") {
      newData = checked;
    } else {
      newData = value;
    }
    listingData[name] = newData;
    this.setState({
      listingData
    });
  };

  handleSubmit = async e => {
    e.preventDefault();
    await putListing(this.props.id, this.state.listingData);
  };

  handleFileUpload = async (e) => {
      e.preventDefault();
      const id=this.props.id;
      const file=this.fileInput.current.files[0];
      console.log(file);
      const resp = await postImage(id,file);
      this.setState({
        images:[...this.state.images, resp.image.url]
      })
      console.log(resp);
    }

  render() {
    return (
      <div className="edit-single-listing">
        <form className="edit-listing-form" onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="address">Address:</label>
            <input
              className="edit-input"
              type="text"
              name="address"
              placeholder="address"
              onChange={this.handleChange}
              value={this.state.listingData.address || ""}
            />
          </div>
          <div>
            <label htmlFor="address2">Address Line 2:</label>
            <input
              className="edit-input"
              type="text"
              name="address2"
              placeholder="address 2"
              onChange={this.handleChange}
              value={this.state.listingData.address2 || ""}
            />
          </div>
          <div>
            <label htmlFor="state">State:</label>
            <input
              className="edit-input"
              type="text"
              name="state"
              placeholder="state"
              onChange={this.handleChange}
              value={this.state.listingData.state || ""}
            />
          </div>
          <div>
            <label htmlFor="city">City:</label>
            <input
              className="edit-input"
              type="text"
              name="city"
              placeholder="city"
              onChange={this.handleChange}
              value={this.state.listingData.city || ""}
            />
          </div>
          <div>
            <label htmlFor="zip">Zip Code:</label>
            <input
              className="edit-input"
              type="text"
              name="zip"
              placeholder="zip"
              onChange={this.handleChange}
              value={this.state.listingData.zip || ""}
            />
          </div>
          <div className="price-input">
            <label htmlFor="price">Price:</label>
            <input
              className="edit-input price"
              type="text"
              name="price"
              placeholder="price"
              onChange={this.handleChange}
              value={this.state.listingData.price || ""}
            />

            <div className="rental">
              <label htmlFor="rental">Rental:</label>
              <input
                type="checkbox"
                name="rental"
                onChange={this.handleChange}
                checked={this.state.listingData.rental || ""}
              />
            </div>
          </div>

          <div>
            <label htmlFor="size">Size (ft²):</label>
            <input
              className="edit-input"
              type="text"
              name="size"
              placeholder="size"
              onChange={this.handleChange}
              value={this.state.listingData.size || false}
            />
          </div>
          <div>
            <label htmlFor="bedrooms">Bedrooms:</label>
            <input
              className="edit-input"
              type="text"
              name="bedrooms"
              placeholder="bedrooms"
              onChange={this.handleChange}
              value={this.state.listingData.bedrooms || ""}
            />
          </div>
          <div>
            <label htmlFor="neighborhood">Neighborhood:</label>
            <input
              className="edit-input"
              type="text"
              name="neighborhood"
              placeholder="neighborhood"
              onChange={this.handleChange}
              value={this.state.listingData.neighborhood || ""}
            />
          </div>
          <div>
            <label htmlFor="description">Description:</label>
            <input
              className="edit-input"
              type="text"
              name="description"
              placeholder="description"
              onChange={this.handleChange}
              value={this.state.listingData.description || ""}
            />
          </div>
          <input type="submit" className="submit" value="Save Listing" />
        </form>
        <form className="image-selection" onSubmit={this.handleFileUpload}>
          <label htmlFor="img">Select image: </label>
          <input
            type="file"
            id="img"
            name="img"
            accept="image/*"
            ref={this.fileInput}
          />
          <input className="img-input" type="submit" />
        </form>
        <div className="listings-form-images">
          {this.state.images.map((image, key) => (
            <img src={image} key={key}/>
          ))}
        </div>
      </div>
    );
  }
}
export default EditListingsForm;
