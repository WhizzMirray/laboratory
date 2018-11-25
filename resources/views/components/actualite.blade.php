<div class="theme-material-card blog-full-block">
                        <div class="row">
                            <div class="col-sm-4">
                                <div class="blog-full-date">{{$actualite->created_at->day}} {{date("F", mktime(0, 0, 0, $actualite->created_at->month, 1))}} {{$actualite->created_at->year}}</div>
                                <div class="theme-img theme-img-scalerotate">
                                    <img src="{{asset('uploads/'.'blog-1'.'.jpg')}}" alt="">
                                </div>
                            </div>
                            <div class="col-sm-8">
                                <div class="blog-full-ttl">
                                    <h3><a href="#">{{$actualite->titre}}</a></h3>
                                </div>
                                <div class="blog-full-description">{{substr ($actualite->content,0,260)}}</div>
                                <div class="blog-full-ftr">
                                    <a class="pull-right anchor-icon">
                                        Lire la suite <i class="fa fa-arrow-right"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
</div>