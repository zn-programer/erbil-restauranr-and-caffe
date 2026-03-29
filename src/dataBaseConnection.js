/** @format */

import { createClient } from "@supabase/supabase-js";

// هذه القيم تجدها في إعدادات مشروعك بـ Supabase (Settings > API)
const supabaseUrl = "https://favyhwtckmxfwztbbkhj.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZhdnlod3Rja214Znd6dGJia2hqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQwMjc3MjUsImV4cCI6MjA4OTYwMzcyNX0.oNrr1LyhYdMwgKr1XnV2gI928VYu7zzithk47TP800w";
const supabase = createClient(supabaseUrl, supabaseAnonKey);
export const fetchProducts = async (setLoading, setProducts) => {
  try {
    setLoading(true);
    // جلب جميع البيانات من جدول products وترتيبها حسب الأحدث
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("id", { ascending: false });
    if (error) throw error;
    console.log(data);
    setProducts(data);
  } catch (error) {
    console.error("خطأ في جلب البيانات:", error.message);
  } finally {
    setLoading(false);
  }
};
