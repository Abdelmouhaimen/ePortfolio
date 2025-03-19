import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { InView } from 'react-intersection-observer';
import { BsGithub } from "react-icons/bs";
import { CgWebsite } from "react-icons/cg";

const VerticalTimelineElement = ({
  children = '',
  className = '',
  contentArrowStyle = null,
  contentStyle = null,
  date = '',
  dateClassName = '',
  icon = null,
  iconClassName = '',
  iconOnClick = null,
  onTimelineElementClick = null,
  iconStyle = null,
  id = '',
  position = '',
  style = null,
  textClassName = '',
  intersectionObserverProps = {
    rootMargin: '0px 0px -40px 0px',
    triggerOnce: true,
  },
  visible = false,
  fileText = 'Download',
  file = '',
  ghLink = '',
  demoLink = '',
}) => (
  <InView {...intersectionObserverProps}>
    {({ inView, ref }) => (
      <div
        ref={ref}
        id={id}
        className={classNames(className, 'vertical-timeline-element', {
          'vertical-timeline-element--left': position === 'left',
          'vertical-timeline-element--right': position === 'right',
          'vertical-timeline-element--no-children': children === '',
        })}
        style={style}
      >
        <React.Fragment>
          <span
            style={iconStyle}
            onClick={iconOnClick}
            className={classNames(
              iconClassName,
              'vertical-timeline-element-icon',
              {
                'bounce-in': inView || visible,
                'is-hidden': !(inView || visible),
              }
            )}
          >
            {icon}
          </span>
          <div
            style={contentStyle}
            onClick={onTimelineElementClick}
            className={classNames(
              textClassName,
              'vertical-timeline-element-content',
              {
                'bounce-in': inView || visible,
                'is-hidden': !(inView || visible),
              }
            )}
          >
            <div
              style={contentArrowStyle}
              className="vertical-timeline-element-content-arrow"
            />
            {children}
            <span
              className={classNames(
                dateClassName,
                'vertical-timeline-element-date'
              )}
            >
              {date}
            </span>

            {/* GitHub Button */}
            {ghLink && (
              <a href={ghLink} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', marginRight: '10px' }}>
                <button type="button" className="download-button">
                  <BsGithub /> &nbsp; GitHub
                </button>
              </a>
            )}

            {/* Demo Button */}
            {demoLink && (
              <a href={demoLink} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                <button type="button" className="download-button">
                  <CgWebsite /> &nbsp; Demo
                </button>
              </a>
            )}

            {/* File Download Button */}
            {file && (
              <a href={file} download style={{ textDecoration: 'none', marginLeft: '10px' }}>
                <button type="button" className="download-button">
                  {fileText}
                </button>
              </a>
            )}
          </div>
        </React.Fragment>
      </div>
    )}
  </InView>
);

VerticalTimelineElement.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  className: PropTypes.string,
  contentArrowStyle: PropTypes.shape({}),
  contentStyle: PropTypes.shape({}),
  date: PropTypes.node,
  dateClassName: PropTypes.string,
  icon: PropTypes.element,
  iconClassName: PropTypes.string,
  iconStyle: PropTypes.shape({}),
  iconOnClick: PropTypes.func,
  onTimelineElementClick: PropTypes.func,
  id: PropTypes.string,
  position: PropTypes.string,
  style: PropTypes.shape({}),
  textClassName: PropTypes.string,
  visible: PropTypes.bool,
  intersectionObserverProps: PropTypes.shape({
    root: PropTypes.object,
    rootMargin: PropTypes.string,
    threshold: PropTypes.number,
    triggerOnce: PropTypes.bool,
  }),
  fileText: PropTypes.string,
  file: PropTypes.string,
  ghLink: PropTypes.string,
  demoLink: PropTypes.string,
};

export default VerticalTimelineElement;
