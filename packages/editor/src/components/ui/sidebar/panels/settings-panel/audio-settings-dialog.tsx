import * as DialogPrimitive from '@radix-ui/react-dialog'
import * as SliderPrimitive from '@radix-ui/react-slider'
import { Volume2, VolumeX, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import useAudio from '../../../../../store/use-audio'

const AUDIO_SETTINGS_DIALOG_STYLES = `
.pascal-audio-settings__trigger,
.pascal-audio-settings__close,
.pascal-audio-settings__mute-button {
  all: unset;
  box-sizing: border-box;
  font-family: inherit;
}

.pascal-audio-settings__trigger {
  display: flex;
  width: 100%;
  min-height: 36px;
  align-items: center;
  gap: 8px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.03);
  color: #e8edf2;
  padding: 8px 12px;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  cursor: pointer;
  transition:
    background-color 160ms ease,
    border-color 160ms ease,
    color 160ms ease;
}

.pascal-audio-settings__trigger:hover {
  border-color: rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.08);
}

.pascal-audio-settings__trigger:focus-visible,
.pascal-audio-settings__close:focus-visible,
.pascal-audio-settings__mute-button:focus-visible {
  outline: 2px solid rgba(223, 229, 235, 0.72);
  outline-offset: 2px;
}

.pascal-audio-settings__overlay {
  position: fixed;
  inset: 0;
  z-index: 50;
  background: rgba(0, 0, 0, 0.5);
}

.pascal-audio-settings__content {
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 51;
  box-sizing: border-box;
  display: grid;
  width: min(640px, calc(100vw - 32px));
  max-height: calc(100vh - 32px);
  transform: translate(-50%, -50%);
  gap: 28px;
  overflow: auto;
  border: 1px solid #a7b0bb;
  border-radius: 12px;
  background: #151515;
  color: #e8edf2;
  padding: 34px 36px 60px;
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.45);
  outline: none;
}

.pascal-audio-settings__close {
  position: absolute;
  top: 24px;
  right: 26px;
  display: flex;
  width: 26px;
  height: 26px;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  color: #a7b0bb;
  cursor: pointer;
  transition:
    background-color 160ms ease,
    color 160ms ease;
}

.pascal-audio-settings__close:hover {
  background: rgba(255, 255, 255, 0.08);
  color: #f3f6f9;
}

.pascal-audio-settings__header {
  display: grid;
  gap: 24px;
}

.pascal-audio-settings__title {
  margin: 0;
  color: #edf2f7;
  font-size: 28px;
  font-weight: 700;
  line-height: 1.15;
}

.pascal-audio-settings__description {
  margin: 0;
  color: rgba(232, 237, 242, 0.62);
  font-size: 20px;
  font-weight: 600;
  line-height: 1.4;
}

.pascal-audio-settings__body {
  display: grid;
  gap: 36px;
}

.pascal-audio-settings__field {
  display: grid;
  gap: 12px;
}

.pascal-audio-settings__field-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.pascal-audio-settings__label {
  color: #edf2f7;
  font-size: 22px;
  font-weight: 700;
  line-height: 1.2;
}

.pascal-audio-settings__value {
  color: rgba(232, 237, 242, 0.64);
  font-size: 20px;
  font-weight: 600;
  line-height: 1.2;
}

.pascal-audio-settings__slider {
  position: relative;
  display: flex;
  width: 100%;
  height: 22px;
  touch-action: none;
  user-select: none;
  align-items: center;
}

.pascal-audio-settings__slider-track {
  position: relative;
  height: 18px;
  flex: 1;
  overflow: hidden;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.08);
}

.pascal-audio-settings__slider-range {
  position: absolute;
  height: 100%;
  border-radius: inherit;
  background: #dfe5eb;
}

.pascal-audio-settings__slider-thumb {
  display: block;
  width: 18px;
  height: 18px;
  border: 1px solid #dfe5eb;
  border-radius: 999px;
  background: #151515;
  box-shadow: 0 0 0 2px rgba(21, 21, 21, 0.9);
  transition:
    box-shadow 160ms ease,
    transform 160ms ease;
}

.pascal-audio-settings__slider-thumb:hover,
.pascal-audio-settings__slider-thumb:focus-visible {
  box-shadow: 0 0 0 5px rgba(223, 229, 235, 0.18);
  outline: none;
}

.pascal-audio-settings__slider[data-disabled] {
  opacity: 0.72;
}

.pascal-audio-settings__slider[data-disabled] .pascal-audio-settings__slider-thumb {
  cursor: not-allowed;
}

.pascal-audio-settings__separator {
  height: 1px;
  background: #a7b0bb;
}

.pascal-audio-settings__mute-button {
  display: flex;
  min-height: 54px;
  width: 100%;
  align-items: center;
  gap: 12px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.08);
  color: #e8edf2;
  padding: 0 18px;
  font-size: 20px;
  font-weight: 700;
  line-height: 1.2;
  cursor: pointer;
  transition:
    background-color 160ms ease,
    border-color 160ms ease,
    color 160ms ease;
}

.pascal-audio-settings__mute-button:hover {
  border-color: rgba(255, 255, 255, 0.28);
  background: rgba(255, 255, 255, 0.13);
  color: #ffffff;
}

.pascal-audio-settings__icon {
  width: 18px;
  height: 18px;
  flex: 0 0 auto;
}

.pascal-audio-settings__close-icon {
  width: 18px;
  height: 18px;
}

@media (max-width: 640px) {
  .pascal-audio-settings__content {
    width: min(100vw - 24px, 520px);
    padding: 28px 24px 36px;
  }

  .pascal-audio-settings__title {
    font-size: 24px;
  }

  .pascal-audio-settings__description,
  .pascal-audio-settings__label,
  .pascal-audio-settings__value,
  .pascal-audio-settings__mute-button {
    font-size: 16px;
  }
}
`

function AudioSlider({
  value,
  disabled,
  onValueChange,
}: {
  value: number
  disabled: boolean
  onValueChange: (value: number) => void
}) {
  return (
    <SliderPrimitive.Root
      className="pascal-audio-settings__slider"
      disabled={disabled}
      max={100}
      onValueChange={(nextValue) => nextValue[0] !== undefined && onValueChange(nextValue[0])}
      step={1}
      value={[value]}
    >
      <SliderPrimitive.Track className="pascal-audio-settings__slider-track">
        <SliderPrimitive.Range className="pascal-audio-settings__slider-range" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb className="pascal-audio-settings__slider-thumb" />
    </SliderPrimitive.Root>
  )
}

export function AudioSettingsDialog() {
  const { t } = useTranslation()
  const {
    masterVolume,
    sfxVolume,
    radioVolume,
    muted,
    setMasterVolume,
    setSfxVolume,
    setRadioVolume,
    toggleMute,
  } = useAudio()

  return (
    <DialogPrimitive.Root>
      <style>{AUDIO_SETTINGS_DIALOG_STYLES}</style>
      <DialogPrimitive.Trigger asChild>
        <button className="pascal-audio-settings__trigger" type="button">
          {muted ? (
            <VolumeX className="pascal-audio-settings__icon" />
          ) : (
            <Volume2 className="pascal-audio-settings__icon" />
          )}
          {t('Audio Settings')}
        </button>
      </DialogPrimitive.Trigger>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="pascal-audio-settings__overlay" />
        <DialogPrimitive.Content className="pascal-audio-settings__content">
          <div className="pascal-audio-settings__header">
            <DialogPrimitive.Title className="pascal-audio-settings__title">
              {t('Audio Settings')}
            </DialogPrimitive.Title>
            <DialogPrimitive.Description className="pascal-audio-settings__description">
              {t('Adjust volume levels and mute settings')}
            </DialogPrimitive.Description>
          </div>

          <div className="pascal-audio-settings__body">
            <div className="pascal-audio-settings__field">
              <div className="pascal-audio-settings__field-header">
                <label className="pascal-audio-settings__label">{t('Master Volume')}</label>
                <span className="pascal-audio-settings__value">{masterVolume}%</span>
              </div>
              <AudioSlider
                disabled={muted}
                onValueChange={setMasterVolume}
                value={masterVolume}
              />
            </div>

            <div className="pascal-audio-settings__field">
              <div className="pascal-audio-settings__field-header">
                <label className="pascal-audio-settings__label">{t('Radio Volume')}</label>
                <span className="pascal-audio-settings__value">{radioVolume}%</span>
              </div>
              <AudioSlider disabled={muted} onValueChange={setRadioVolume} value={radioVolume} />
            </div>

            <div className="pascal-audio-settings__field">
              <div className="pascal-audio-settings__field-header">
                <label className="pascal-audio-settings__label">{t('Sound Effects')}</label>
                <span className="pascal-audio-settings__value">{sfxVolume}%</span>
              </div>
              <AudioSlider disabled={muted} onValueChange={setSfxVolume} value={sfxVolume} />
            </div>

            <div className="pascal-audio-settings__separator" />

            <button
              className="pascal-audio-settings__mute-button"
              onClick={toggleMute}
              type="button"
            >
              {muted ? (
                <VolumeX className="pascal-audio-settings__icon" />
              ) : (
                <Volume2 className="pascal-audio-settings__icon" />
              )}
              {muted ? t('Unmute All Sounds') : t('Mute All Sounds')}
            </button>
          </div>

          <DialogPrimitive.Close
            aria-label={t('Close')}
            className="pascal-audio-settings__close"
          >
            <X className="pascal-audio-settings__close-icon" />
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}
