# Environment Variables Configuration

To securely add the Supabase URL and Supabase Anon (anonymous) Key on deployment, you need to configure environment variables. Here is how you can set them up:

1. Create a `.env.local` file in the root of your project if it doesn't exist.

2. Add the following lines to your `.env.local` file, replacing `<SUPABASE_URL>` and `<SUPABASE_ANON_KEY>` with your actual Supabase URL and Anon Key values, respectively:

   ```
   VITE_SUPABASE_URL=<SUPABASE_URL>
   VITE_SUPABASE_ANON_KEY=<SUPABASE_ANON_KEY>
   ```

3. Your project will now use these environment variables during the build process. Make sure `.env.local` is included in your `.gitignore` file to prevent it from being committed to version control.

Note: The `VITE_` prefix is necessary because Vite (the build tool used in this project) only exposes environment variables to your app if they have the `VITE_` prefix.

Remember to replace `<SUPABASE_URL>` and `<SUPABASE_ANON_KEY>` with your actual Supabase credentials.
