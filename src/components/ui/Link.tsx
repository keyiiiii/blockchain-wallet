import * as React from 'react';
import { history } from '../../router/history';

interface Props {
  className?: string;
  to: string;
  children: {};
  target?: string;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}

const isModifiedEvent = (event: React.MouseEvent<HTMLElement>): boolean =>
  event.metaKey || event.altKey || event.ctrlKey || event.shiftKey;

/**
 * pushState を使って遷移します
 */
export class Link extends React.PureComponent<Props, {}> {
  constructor(props: Props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  render() {
    const { to, children } = this.props;
    return (
      <a href={to} onClick={this.onClick}>
        {children}
      </a>
    );
  }

  onClick(event: React.MouseEvent<HTMLElement>) {
    if (this.props.onClick) {
      this.props.onClick(event);
    }
    if (
      !event.defaultPrevented && // onClick prevented default
      event.button === 0 && // ignore everything but left clicks
      !this.props.target && // let browser handle "target=_blank" etc.
      !isModifiedEvent(event) // ignore clicks with modifier keys
    ) {
      event.preventDefault();
      const { to } = this.props;
      history.push(to);
    }
  }
}
