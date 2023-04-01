import classNames from 'classnames';

const Alert = ({ text, color = 'primary', light = false }) => {
  return (
    <div
      className={classNames({
        alert: true,
        [`alert--${color}`]: true,
        'alert--light': light,
      })}
    >
      {text}
    </div>
  );
};

export default Alert;
