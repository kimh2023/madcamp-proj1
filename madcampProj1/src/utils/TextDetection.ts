import {Frame, VisionCameraProxy} from 'react-native-vision-camera';

const plugin = VisionCameraProxy.initFrameProcessorPlugin('detectText');

/**
 * Scans faces.
 */
export function detectText(frame: Frame): object {
  'worklet';
  if (plugin == null)
    throw new Error('Failed to load Frame Processor Plugin "detectText"!');
  return plugin.call(frame);
}
