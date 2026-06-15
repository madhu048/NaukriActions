import { test, expect } from '@playwright/test';
import path from 'path';

const ResumePath = path.join(__dirname, '../Resume/MADHU GERA RESUME.docx');

test('test', async ({ page }) => {
  page.setDefaultTimeout(80000);
  await page.goto('https://www.naukri.com/');
    await expect(page.locator('#login_Layer')).toContainText('Login');
    await page.getByRole('link', { name: 'Login', exact: true }).click();
    await expect(page.locator('form[name="login-form"]')).toContainText('Email ID / Username');
    await page.getByRole('textbox', { name: 'Enter your active Email ID /' }).click();
    await page.getByRole('textbox', { name: 'Enter your active Email ID /' }).fill('geramadhu048@gmail.com');
    await expect(page.locator('form[name="login-form"]')).toContainText('Password');
    await page.getByRole('textbox', { name: 'Enter your password' }).click();
    await page.getByRole('textbox', { name: 'Enter your password' }).fill('Gmadhu@123');
    await expect(page.locator('.btn-primary.loginButton')).toHaveText('Login');
    await page.getByRole('button', { name: 'Login', exact: true }).click();
  try{
    await expect(page.getByRole('main')).toContainText('View profile');
    await page.getByRole('link', { name: 'View profile' }).click();
    await expect(page.locator('#lazyAttachCV')).toContainText('Update resume');
    const [fileChooser] = await Promise.all([
      page.waitForEvent('filechooser'),
      page.getByText('Update resume').first().click(),
    ]);
    await fileChooser.setFiles(ResumePath);
    await page.waitForTimeout(5000);
    await expect(page.locator('#lazyAttachCV')).toContainText('MADHU GERA RESUME.docx');
    await expect(page.getByAltText('naukri user profile img')).toBeVisible();
    await page.getByAltText('naukri user profile img').click();
    await expect(page.getByText('Logout')).toBeVisible({timeout: 10000});
    await page.getByText('Logout').first().click();
    await expect(page.getByText('Register')).toBeVisible();
  }catch(error){
    console.error('An error occurred:', error);
  }
});
