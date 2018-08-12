import React, {Component, Children} from 'react';

export class TabList extends Component {
  constructor(props){
    super(props);
    this.state = ({
      currentTab : null,
    });
  }
  handleTabClick(currentTab){
    console.log(currentTab);
    this.setState({currentTab});
  }

  render() {
    const {children} = this.props;
    const currentTab = this.state.currentTab || Children.toArray(children)[0].props.name;
    const header = Children.map(children, (child) => {
      let {name} = child.props;
      let className = currentTab === name ? 'selected' : '';
      return <p className={className}
                onClick={()=>this.handleTabClick(name)}
      >{name}</p>
    });
    const body = Children.toArray(children)
      .find(child=>child.props.name===currentTab)
      .props.children;
    return (
      <div className="tab-container">
        <div className="tab-header">
          {header}
        </div>
        <div className="tab-body">
          {body}
        </div>
      </div>
    );
  }
}

export const Tab = (props) => {
  return <div hidden={props.hidden}>{props.children}</div>;
};