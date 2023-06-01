'use client';

import { cx } from 'cva';
import * as React from 'react';
import { IoMdClose } from 'react-icons/io';
import { Button } from '../atoms';

interface Props {
  isOpen?: boolean;
  disabled?: boolean;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel?: string;
  secondaryActionLabel?: string;
  secondaryAction?: () => void;
  onClose: () => void;
  onSubmit: () => void;
}

export const Modal = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  actionLabel,
  footer,
  disabled,
  secondaryAction,
  secondaryActionLabel,
}: Props) => {
  const [showModal, setShowModal] = React.useState(isOpen);

  React.useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = React.useCallback(() => {
    if (disabled) return;
    setShowModal(false);

    setTimeout(() => {
      onClose();
    }, 300);
  }, [disabled, onClose]);

  const handleSecondaryAction = React.useCallback(() => {
    if (disabled || !secondaryAction) return;
    secondaryAction();
  }, [disabled, secondaryAction]);

  const handleSubmit = React.useCallback(() => {
    if (disabled) return;
    onSubmit();
  }, [disabled, onSubmit]);

  if (!isOpen) return null;

  return (
    <React.Fragment>
      <div className='fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-neutral-800/70 outline-none focus:outline-none'>
        <div className='relative mx-auto my-6 h-full w-full md:h-auto md:w-4/6 lg:w-3/6 xl:w-2/5'>
          {/* MODAL CONTENT */}
          <section
            aria-labelledby='modal-heading'
            className={cx(
              'h-full transition duration-300',
              showModal ? 'translate-y-0' : 'translate-y-full',
              showModal ? 'opacity-100' : 'opacity-0'
            )}
          >
            <div className='relative flex h-full w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none transition focus:outline-none md:h-auto'>
              {/* MODAL HEADER */}
              <header className='relative flex items-center justify-center rounded-t border-b p-6'>
                <button
                  type='button'
                  className='absolute left-9 border-0 p-1 transition hover:opacity-70'
                  onClick={handleClose}
                >
                  <IoMdClose size={18} />
                </button>

                <h2 id='modal-heading' className='text-lg font-semibold'>
                  {title}
                </h2>
              </header>
              {/* MODAL HEADER */}

              {/* MODAL BODY */}
              <div className='relative flex-auto p-6'>{body}</div>
              {/* MODAL BODY */}

              {/* MODAL FOOTER */}
              <footer className='flex flex-col gap-2 p-6'>
                <div
                  className='flex w-full items-center gap-4
                  '
                >
                  {secondaryAction && secondaryActionLabel && (
                    <Button
                      disabled={disabled}
                      label={secondaryActionLabel}
                      onClick={handleSecondaryAction}
                      outline
                    />
                  )}
                  <Button
                    disabled={disabled}
                    label={actionLabel}
                    onClick={handleSubmit}
                  />
                </div>
                {footer}
              </footer>
              {/* MODAL FOOTER */}
            </div>
          </section>
        </div>
      </div>
    </React.Fragment>
  );
};
