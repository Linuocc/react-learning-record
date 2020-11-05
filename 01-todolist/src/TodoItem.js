import React, {Component} from "react";
import PropTypes from "prop-types";

class TodoItem extends Component {
  constructor(props) {
    super(props);
  }
  
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    if (nextProps.content != this.props.content) {
      return true;
    } else {
      return false;
    }
  }
  
  
  render() {
    console.log("child render")
    const {content} = this.props;
    return (
      <div onClick={e => this.handleClick(e)}>
        {content}
      </div>
    )
  }
  
  handleClick() {
    const {deleteItem, index} = this.props;
    deleteItem(index);
  }
  
  
}


TodoItem.propTypes = {
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  deleteItem: PropTypes.func,
  index: PropTypes.number.isRequired
}

TodoItem.defaultProps = {}

export default TodoItem;