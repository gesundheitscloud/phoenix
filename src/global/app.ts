import databases from '../databases';

export default async () => {
  /**
   * The code to be executed should be placed within a default function that is
   * exported by the global script. Ensure all of the code in the global script
   * is wrapped in the function() that is exported.
   */

  /**
   *  On native platforms the event is emitted before the code is loaded, so we have to check
   * if the DOMContent was already loaded and continue with our setup
   */
  if (document.readyState !== 'loading') {
    await databases.init();
  } else {
    window.addEventListener('DOMContentLoaded', async () => {
      await databases.init();
    });
  }
};
