-- Add copyright column to settings table if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'settings' AND column_name = 'copyright'
    ) THEN
        ALTER TABLE settings ADD COLUMN copyright TEXT DEFAULT '© 2025 All-Subject English Enlightenment. All rights reserved.';
    END IF;
END $$;

-- Insert default settings if table is empty
INSERT INTO settings (site_name, site_description, welcome_message, welcome_message_chinese, copyright)
SELECT 
    'Link Hub',
    'A collection of useful links',
    'Welcome to All-Subject English Enlightenment',
    '欢迎来到全科英语启蒙',
    '© 2025 All-Subject English Enlightenment. All rights reserved.'
WHERE NOT EXISTS (SELECT 1 FROM settings);
