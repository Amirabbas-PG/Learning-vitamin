<?php
// Exit if accessed directly
if ( !defined( 'ABSPATH' ) ) exit;

// BEGIN ENQUEUE PARENT ACTION
// AUTO GENERATED - Do not modify or remove comment markers above or below:

if ( !function_exists( 'chld_thm_cfg_locale_css' ) ):
    function chld_thm_cfg_locale_css( $uri ){
        if ( empty( $uri ) && is_rtl() && file_exists( get_template_directory() . '/rtl.css' ) )
            $uri = get_template_directory_uri() . '/rtl.css';
        return $uri;
    }
endif;
add_filter( 'locale_stylesheet_uri', 'chld_thm_cfg_locale_css' );

if ( !function_exists( 'chld_thm_cfg_parent_css' ) ):
    function chld_thm_cfg_parent_css() {
        wp_enqueue_style( 'chld_thm_cfg_parent', trailingslashit( get_template_directory_uri() ) . 'style.css', array(  ) );
    }
endif;
add_action( 'wp_enqueue_scripts', 'chld_thm_cfg_parent_css', 10 );

// END ENQUEUE PARENT ACTION
function hamyar_dashboard_widget() {
    wp_add_dashboard_widget(
        'hamyar_rss',         // Widget ID
        'همیار وردپرس | HamyarWP',         // Widget title
        'hamyar_rss_widget','','','','high'  // Callback function to display content
    );
}
add_action('wp_dashboard_setup', 'hamyar_dashboard_widget');

function hamyar_rss_widget() {
    // Display your data here
    $data = wp_remote_get('https://hamyarwp.com/damavand/wp-admin/admin-ajax.php?action=rss_hamyar&time='.time(),[
        'timeout' => 5,
    ]);
    if (is_wp_error($data)) {
        return  "<script>console.log('مشکلی پیش آمده مجددا تلاش نمایید.')</script>";
    }
    $hamyar_view = get_transient('hamyar_rss_key');
    if (false === $hamyar_view) {
        $new_data = wp_remote_retrieve_body($data);
        set_transient('hamyar_rss_key', $new_data, 6 * HOUR_IN_SECONDS);
        echo wp_remote_retrieve_body($data);
    }else{
        echo $hamyar_view;
    }
    
}
