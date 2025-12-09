import Base from '../base';
import { Page } from '@playwright/test';

export default class EditProfilePage extends Base {
  constructor(page: Page) {
    super(page);
  }

  get editUsernameButton() {
    return this.page.locator('[data-testid="user-info-username"] [data-testid="user-info-edit"]');
  }

  get editUserBioButton() {
    return this.page.locator('[data-testid="user-info-bio"] [data-testid="user-info-edit"]');
  }

  get uploadImageButton() {
    return this.page.locator('[data-testid="upe-image-select-fileInput"]');
  }

  get deleteImageButton() {
    return this.page.locator('[data-testid="upe-image-delete"]');
  }

  get usernameInputField() {
    return this.page.locator('#text-input__0');
  }

  get userBioInputField() {
    return this.page.locator('#textarea__0');
  }

  get profileImagePreview() {
    return this.page.locator('[data-testid="user-info-container"] .ipc-image');
  }

  get saveChangesButton() {
    return this.page.locator('[data-testid="prompt-saveButton"]');
  }

  get saveProfileImageButton() {
    return this.page.locator('[data-testid="upe-image-upload-prompt-save"]');
  }

  get backButton() {
    return this.page.locator('[data-testid="edit-header"] [data-testid="edit-header-back"]');
  }

  get editUsernameDialog() {
    return this.page.locator('[role="dialog"]');
  }

  get profileImageDialog() {
    return this.page.locator('[data-testid="promptable"]');
  }

  async changeUsername(newUsername: string) {
    await this.page.waitForTimeout(2000);
    await this.editUsernameButton.click();
    await this.usernameInputField.click();
    
    const currentValue = await this.usernameInputField.inputValue();
    
    let usernameToSet = newUsername;
    if (currentValue === newUsername) {
      usernameToSet = newUsername + '6';
    }
    
    await this.usernameInputField.fill(usernameToSet);
    await this.saveChangesButton.click();
    await this.profileImageDialog.waitFor({ state: 'detached' });
    return usernameToSet;
  }

  async changeUserBio(newUserBio: string) {
    await this.page.waitForTimeout(2000);
    await this.editUserBioButton.click();
    await this.userBioInputField.click();

    const currentBio = await this.userBioInputField.inputValue();

    let bioToSet = newUserBio;
    if (currentBio === newUserBio) {
      bioToSet = newUserBio + '1';
    }
    await this.userBioInputField.fill(bioToSet);
    await this.saveChangesButton.click();
    await this.profileImageDialog.waitFor({ state: 'detached' });
    return bioToSet;
  }

  async backToUserProfile() {
    await this.backButton.click();
  }

  async uploadProfileImage(imagePath: string) {
    await this.page.waitForTimeout(2000);
    await this.uploadImageButton.setInputFiles(imagePath);
    await this.saveProfileImageButton.click();
    await this.profileImageDialog.waitFor({ state: 'detached' });
  }

  async deleteProgileImage() {
    await this.page.waitForTimeout(2000);
    await this.deleteImageButton.click();
    await this.saveChangesButton.click();
    await this.profileImageDialog.waitFor({ state: 'detached' });
  }
}
